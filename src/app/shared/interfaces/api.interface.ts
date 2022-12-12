export interface IApiResponseGrid {
    id: number,
    name: string,
    business: string,
    valuation: number,
    active: boolean,
}

export interface IApiResponseDetail extends IApiResponseGrid {
    cep: string,
    cnpj: number
}

