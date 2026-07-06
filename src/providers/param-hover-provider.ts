import * as vscode from 'vscode';
import { getParameter } from '../services';

export default function setParamHoverProvider(): vscode.Disposable {
  return vscode.languages.registerHoverProvider('advpl', {
		provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
			const parameterRegex: RegExp = new RegExp("MV_[A-Z0-9_]*", "ig");
			const range = document.getWordRangeAtPosition(position, parameterRegex);

			if (!range) {
				return;
			};

			const hoveredParameter: string = document.getText(range).toUpperCase();
			const description = getParameter(hoveredParameter);

			if (description) {
				return new vscode.Hover(`**${hoveredParameter}**: ${description}`);
			};
		}
  });
};
