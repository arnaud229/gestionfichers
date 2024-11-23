export interface Service {
    uid?: string,
    nom_service: string,
    nom : string,
    prenoms: string,
    mail: string,
    mdp: string,

}

export interface Dossier {
    did?: string,
    auteur: string,
    destinateur: string,
    createdAt?: any,
    objet: string, 
    fichier: file
}


export type file = {
    type: string,
    url: string,
}