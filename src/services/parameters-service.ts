import * as vscode from 'vscode';
import defaultParameters from '../resources/default_parameters.json';

const USER_PARAMETERS_KEY = 'protheus-params.userParameters';

const defaults: Record<string, string> = defaultParameters;
let userParameters: Record<string, string> = {};

/**
 * Carrega os parâmetros do usuário previamente importados a partir do
 * armazenamento global da extensão. Deve ser chamado na ativação.
 */
export function loadUserParameters(context: vscode.ExtensionContext): void {
	userParameters = context.globalState.get<Record<string, string>>(USER_PARAMETERS_KEY, {});
};

/**
 * Retorna a descrição de um parâmetro consultando as duas fontes,
 * priorizando os parâmetros importados pelo usuário sobre os padrão.
 */
export function getParameter(name: string): string | undefined {
	const key = name.toUpperCase();
	return userParameters[key] ?? defaults[key];
};

/**
 * Abre um seletor de arquivo para o usuário importar um JSON de parâmetros
 * no formato { "MV_XXXX": "descrição" }. As chaves são normalizadas para
 * maiúsculas e o conjunto importado substitui qualquer importação anterior.
 */
export async function importUserParameters(context: vscode.ExtensionContext): Promise<void> {
	const selection = await vscode.window.showOpenDialog({
		canSelectMany: false,
		openLabel: 'Importar',
		title: 'Selecione o JSON de parâmetros do usuário',
		// eslint-disable-next-line @typescript-eslint/naming-convention -- rótulo de exibição do seletor de arquivos
		filters: { 'Arquivos JSON': ['json'] }
	});

	if (!selection || selection.length === 0) {
		return;
	};

	let parsed: unknown;

	try {
		const document = await vscode.workspace.openTextDocument(selection[0]);
		parsed = JSON.parse(document.getText());
	} catch (error) {
		const detail = error instanceof Error ? error.message : String(error);
		vscode.window.showErrorMessage(`Não foi possível ler o JSON de parâmetros: ${detail}`);
		return;
	};

	if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
		vscode.window.showErrorMessage('Formato inválido: o arquivo deve ser um objeto JSON no formato { "MV_XXXX": "descrição" }.');
		return;
	};

	const normalized: Record<string, string> = {};
	let ignored = 0;

	for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
		if (typeof value === 'string') {
			normalized[key.toUpperCase()] = value;
		} else {
			ignored++;
		};
	};

	const imported = Object.keys(normalized).length;

	if (imported === 0) {
		vscode.window.showErrorMessage('Nenhum parâmetro válido encontrado no arquivo (esperado { "MV_XXXX": "descrição" }).');
		return;
	};

	const overrides = Object.keys(normalized).filter((key) => defaults[key] !== undefined).length;

	userParameters = normalized;
	await context.globalState.update(USER_PARAMETERS_KEY, normalized);

	let message = `${imported} parâmetro(s) importado(s), sobrescrevendo ${overrides} padrão(ões).`;

	if (ignored > 0) {
		message += ` ${ignored} entrada(s) ignorada(s) por não ter descrição em texto.`;
	};

	vscode.window.showInformationMessage(message);
};

/**
 * Remove os parâmetros importados pelo usuário, voltando a usar apenas os padrão.
 */
export async function clearUserParameters(context: vscode.ExtensionContext): Promise<void> {
	if (Object.keys(userParameters).length === 0) {
		vscode.window.showInformationMessage('Não há parâmetros do usuário importados.');
		return;
	};

	userParameters = {};
	await context.globalState.update(USER_PARAMETERS_KEY, undefined);
	vscode.window.showInformationMessage('Parâmetros do usuário removidos. Consultando apenas os parâmetros padrão.');
};
