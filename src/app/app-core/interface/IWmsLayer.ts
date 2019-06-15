
export interface IWmsLayers {
    id: string;
    typegroup: string;
    group: string;
    url: string;
    visible: boolean;
    params: {
        layers: string,
        transparent: boolean
    };
}
