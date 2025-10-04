import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const outputFile = 'analise_do_projeto.txt';

// Itens a serem ignorados (muito importante!)
const ignoreList = [
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  'package-lock.json',
  'yarn.lock',
  'analise_do_projeto.txt',
  'analisar.js'
];

let projectData = '';

function directoryTree(startPath) {
  const files = fs.readdirSync(startPath);
  let tree = '';
  files.forEach((file, index) => {
    const isLast = index === files.length - 1;
    const filePath = path.join(startPath, file);
    if (ignoreList.includes(file)) return;

    const stats = fs.statSync(filePath);
    const prefix = '  '.repeat(startPath.split(path.sep).length - projectRoot.split(path.sep).length);

    tree += `${prefix}${isLast ? '└──' : '├──'} ${file}\n`;

    if (stats.isDirectory()) {
      tree += directoryTree(filePath);
    }
  });
  return tree;
}

function readFiles(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (ignoreList.includes(file)) {
      continue;
    }

    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      readFiles(filePath);
    } else {
      // Apenas adiciona arquivos de texto comuns (js, jsx, css, json, etc.)
      if (/\.(jsx?|tsx?|css|scss|json|md|mdx|html|svg|js)$/.test(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        projectData += `--- INÍCIO DO ARQUIVO: ${path.relative(projectRoot, filePath)} ---\n\n`;
        projectData += `${content}\n\n`;
        projectData += `--- FIM DO ARQUIVO: ${path.relative(projectRoot, filePath)} ---\n\n`;
      }
    }
  }
}

try {
  console.log('Analisando a estrutura de pastas...');
  const tree = `ESTRUTURA DE PASTAS:\n\n${projectRoot.split(path.sep).pop()}\n${directoryTree(projectRoot)}`;

  console.log('Lendo o conteúdo dos arquivos...');
  readFiles(projectRoot);

  fs.writeFileSync(outputFile, `${tree}\n\nCONTEÚDO DOS ARQUIVOS:\n\n${projectData}`);

  console.log(`\nAnálise concluída! O resultado foi salvo em "${outputFile}".`);
  console.log('Por favor, copie todo o conteúdo deste arquivo e cole na nossa conversa.');
} catch (error) {
  console.error('Ocorreu um erro durante a análise:', error);
}