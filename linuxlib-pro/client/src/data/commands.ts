export interface Command {
  id: string;
  name: string;
  category: string;
  description: string;
  example: string;
  explanation: string;
}

export const commands: Command[] = [
  {
    id: "grep-1",
    name: "grep",
    category: "Busca",
    description: "Busca padrões em arquivos usando expressões regulares.",
    example: "$ grep -rn 'palavra' .",
    explanation: "Procura recursivamente pela palavra 'palavra' em todos os arquivos do diretório atual, mostrando o número da linha onde foi encontrada.",
  },
  {
    id: "find-1",
    name: "find",
    category: "Sistema",
    description: "Procura arquivos e diretórios com critérios como nome, tamanho, data.",
    example: "$ find /home -name '*.pdf' -size +1M",
    explanation: "Encontra todos os arquivos PDF maiores que 1MB no diretório /home.",
  },
  {
    id: "tar-1",
    name: "tar",
    category: "Arquivos",
    description: "Compacta/descompacta arquivos .tar, .gz, .bz2.",
    example: "$ tar -xzf arquivo.tar.gz",
    explanation: "Extrai (x) um arquivo compactado em gzip (z) do arquivo.tar.gz (f).",
  },
  {
    id: "ssh-1",
    name: "ssh",
    category: "Rede",
    description: "Conexão segura a servidores remotos.",
    example: "$ ssh -i chave.pem user@host",
    explanation: "Conecta ao servidor remoto usando uma chave privada para autenticação.",
  },
  {
    id: "rsync-1",
    name: "rsync",
    category: "Arquivos",
    description: "Sincronização eficiente de arquivos local/remoto.",
    example: "$ rsync -avz src/ user@host:/dest/",
    explanation: "Sincroniza o diretório 'src' com '/dest/' no servidor remoto, preservando permissões e compactando dados.",
  },
  {
    id: "docker-1",
    name: "docker",
    category: "Containers",
    description: "Gerencia containers Docker.",
    example: "$ docker ps -a",
    explanation: "Lista todos os containers (em execução e parados) no seu sistema.",
  },
  {
    id: "systemctl-1",
    name: "systemctl",
    category: "Sistema",
    description: "Controla serviços systemd.",
    example: "$ systemctl status nginx",
    explanation: "Verifica o status atual do serviço nginx.",
  },
  {
    id: "chmod-1",
    name: "chmod",
    category: "Permissões",
    description: "Altera permissões de arquivos.",
    example: "$ chmod 755 script.sh",
    explanation: "Define permissões de leitura, escrita e execução para o arquivo script.sh.",
  },
  {
    id: "ls-1",
    name: "ls",
    category: "Sistema",
    description: "Lista o conteúdo de diretórios.",
    example: "$ ls -lah",
    explanation: "Lista todos os arquivos (incluindo ocultos) com detalhes de permissões e tamanho em formato legível.",
  },
  {
    id: "cd-1",
    name: "cd",
    category: "Sistema",
    description: "Muda de diretório.",
    example: "$ cd /home/usuario/projetos",
    explanation: "Navega para o diretório especificado.",
  },
  {
    id: "mkdir-1",
    name: "mkdir",
    category: "Arquivos",
    description: "Cria novos diretórios.",
    example: "$ mkdir -p projeto/src/components",
    explanation: "Cria o diretório 'projeto' e seus subdiretórios, mesmo que os pais não existam.",
  },
  {
    id: "cp-1",
    name: "cp",
    category: "Arquivos",
    description: "Copia arquivos e diretórios.",
    example: "$ cp -r src/ backup/",
    explanation: "Copia recursivamente o diretório 'src' para 'backup'.",
  },
  {
    id: "mv-1",
    name: "mv",
    category: "Arquivos",
    description: "Move ou renomeia arquivos.",
    example: "$ mv arquivo.txt novo_nome.txt",
    explanation: "Renomeia o arquivo para 'novo_nome.txt'.",
  },
  {
    id: "rm-1",
    name: "rm",
    category: "Arquivos",
    description: "Remove arquivos e diretórios.",
    example: "$ rm -rf diretorio/",
    explanation: "Remove recursivamente o diretório e todo seu conteúdo (use com cuidado!).",
  },
  {
    id: "cat-1",
    name: "cat",
    category: "Busca",
    description: "Exibe o conteúdo de arquivos.",
    example: "$ cat arquivo.txt",
    explanation: "Mostra o conteúdo completo do arquivo.txt no terminal.",
  },
];

export const categories = [
  { id: "all", name: "Todos", icon: "Grid3x3" },
  { id: "Sistema", name: "Sistema", icon: "Settings" },
  { id: "Busca", name: "Busca", icon: "Search" },
  { id: "Arquivos", name: "Arquivos", icon: "FileText" },
  { id: "Rede", name: "Rede", icon: "Network" },
  { id: "Containers", name: "Containers", icon: "Box" },
  { id: "Permissões", name: "Permissões", icon: "Lock" },
];
