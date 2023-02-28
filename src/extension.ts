import * as vscode from 'vscode';
import * as Providers from './providers';

export function activate(context: vscode.ExtensionContext) {
	Providers.setParamHoverProvider();
};

export function deactivate() {};
