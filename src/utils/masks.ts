function maskCep(value: string) {
    value = value.replace(/\D/g, ""); // mascara para para o CEP, pega tudo que n for digito, representado por D. G é de forma global.
    // "" remove tudo por vazio
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    // /^ pega o inicio da string, os primeiros 5 numeros digitados e o segundo bloco tudo que foi digitado, colocando o hifen em cada bloco.
    return value;
}

function maskPhone (value: string) {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
}



export { maskCep, maskPhone };