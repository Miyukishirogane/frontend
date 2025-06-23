import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TLoginSale } from 'src/jotai/wallet/type';
export type TUserPublicSale = {
    name: string;
    url: string;
    messError: boolean;
};

export async function LoginSale(params: TLoginSale): Promise<unknown> {

    const reponse = await axios.post(apiUrl.postPrivateSale, {
        password: params.password,
        url: params.url,
    }, {
        headers: {
            Accept: 'application/ json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers':
                'Origin, Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Allow-Headers',
            'Access-Control-Allow-Method': '*',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(response => {
            const data = response?.data as TUserPublicSale;
            return data

        })
        .catch(err => {
            return err
        });

    return reponse
}
