import * as vscode from 'vscode';
import * as Providers from './providers';
import * as Parameters from './services';

export function activate(context: vscode.ExtensionContext) {
	Parameters.loadUserParameters(context);

	context.subscriptions.push(
		Providers.setParamHoverProvider(),
		vscode.commands.registerCommand('protheus-params.importParameters', () => Parameters.importUserParameters(context)),
		vscode.commands.registerCommand('protheus-params.clearUserParameters', () => Parameters.clearUserParameters(context))
	);
};

export function deactivate() {};
