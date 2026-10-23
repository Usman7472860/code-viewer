export type FileRecord = {
  path: string;
  lang: string;
  bytes: number;
  lines: number;
  hash: string;
  content: string;
};

export type ManifestStats = {
  generatedAt: string;
  fileCount: number;
  totalBytes: number;
  totalLines: number;
  logicCount: number;
  hardcodeCount: number;
  langs: Record<string, number>;
};

export type Manifest = { stats: ManifestStats; files: FileRecord[] };

export type LogicUnit = {
  id: string;
  file: string;
  startLine: number;
  endLine: number;
  code: string;
  trigger: { file: string; attr: string } | null;
};

export type Hardcode = { key: string; value: string; file: string; line: number };

export type Endpoint = {
  id: string;
  method: 'GET' | 'POST';
  path: string;
  handler: string;
  summary: string;
  hardcoded: boolean;
  params: { name: string; type: string; required: boolean; note: string }[];
  response: string;
};

export type TreeNode = { name: string; path: string; dir: boolean; children: TreeNode[] };