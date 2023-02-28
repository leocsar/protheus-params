import * as vscode from 'vscode';
import rawParameters from '../resources/default_parameters.json';

export default function setParamHoverProvider() {
  const parameters: Record<string, any> = rawParameters;

  vscode.languages.registerHoverProvider('advpl', {
		provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
			const parameterRegex: RegExp = new RegExp("MV_[A-Z]*", "ig");
			const range = document.getWordRangeAtPosition(position, parameterRegex);
			const hoveredParameter: string = document.getText(range);

			if (parameters[hoveredParameter]) {
				return new vscode.Hover(`**${hoveredParameter}**: ${parameters[hoveredParameter]}`);
			};
		}
  });
};