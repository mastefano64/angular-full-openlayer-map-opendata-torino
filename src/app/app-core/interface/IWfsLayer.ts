
export interface IWfsLayers {
    id: string;
    typegroup: string;
    group: string;
    url: string;
    visible: boolean;
    params: {
        service: string;
        version: string;
        request: string;
        typename: string;
        srsname: string;
    };
}
