const createComponent = (injected, imports, exportProperty) => (injected(imports)[exportProperty]);

export default createComponent;
