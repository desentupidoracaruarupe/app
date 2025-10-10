<?php
// Caminho do arquivo sitemap
$sitemapPath = __DIR__ . '/sitemap.xml';

// Verifica se o arquivo existe
if (!file_exists($sitemapPath)) {
    die("Erro: arquivo sitemap.xml não encontrado.\n");
}

// Lê o conteúdo atual
$xml = simplexml_load_file($sitemapPath);

// Gera a data atual no formato ISO (YYYY-MM-DD)
$dataAtual = date('Y-m-d');

// Atualiza o valor de <lastmod> em todas as URLs
foreach ($xml->url as $url) {
    $url->lastmod = $dataAtual;
}

// Salva novamente o arquivo formatado
$dom = new DOMDocument('1.0', 'UTF-8');
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;
$dom->loadXML($xml->asXML());
$dom->save($sitemapPath);

echo "✅ Sitemap atualizado com sucesso para a data: $dataAtual\n";
