export function formatedMoney(value: string | number, language: string) {
    return language === 'pt-BR' ? value.toLocaleString('pt-br', {
        style:
            'currency',
        currency: 'BRL'
    }) : value.toLocaleString('pt-br', {
        style:
            'currency',
        currency: 'USD'
    })
}