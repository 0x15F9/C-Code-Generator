// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cpp-code-gen" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	let generateClassCommand = vscode.commands.registerCommand('extension.cppGenerateEmptyClass', () => {
		vscode.window.showInputBox({
				placeHolder: "Name of Class. eg: Employee"
			})
			.then((className => {
				vscode.window.showInformationMessage(`Generating Class ${className}...`);
				cppGenerateEmptyClass(className);
			}));
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(generateClassCommand);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

function cppGenerateEmptyClass(className) {
	var editor = vscode.window.activeTextEditor;
	let newLines = editor.document.lineAt(editor.selection.active.line).isEmptyOrWhitespace ? 0 : 1;

	var template = `// Class definition for ${className}\n`;
	template += `class ${className}\n`;
	template += '{\n';
	template += '\n';
	template += '};\n';

	editor.insertSnippet(new vscode.SnippetString(template), new vscode.Position(editor.selection.end.line + newLines, 0))
	.then((className => {
		vscode.window.showInformationMessage(`Class ${className} Generated...`);
	}));
}

module.exports = {
	activate,
	deactivate
}