// Returns the RDF graph merge of all user-readable RDF files in the given container
async function ldpGlob(container) {
  // Fetch the container
  container = $rdf.sym(container); // in case a bare URI was passed
  const containerStore = $rdf.graph();
  await new $rdf.Fetcher(containerStore).load(container);

  // Obtain the list of RDF documents
  const contains = $rdf.sym('http://www.w3.org/ns/ldp#contains');
  const documents = containerStore.each(container, contains)
    .filter(document => /\.(?:ttl|nt|n3|jsonld)$/.test(document.value));

  // Fetch all RDF documents and return their union
  const union = $rdf.graph();
  await new $rdf.Fetcher(union).load(documents);
  return union;
}
