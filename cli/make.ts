import { parse } from 'ts-command-line-args';
import { MakeUtils } from './MakeUtils';

const makeUtils = new MakeUtils();

enum MakeType {
    Error = 'error',
    Brand = 'brand',
    
}

interface Make {
    make: string;
    name: string;
    type?: string;
    domain?: string;
    help?: boolean;
}

export const args = parse<Make>( 
    {
        make: { type: String,  alias: 'm', description: 'Type of make'},
        name: { type: String, alias: 'n', description: 'Copies files rather than moves them' },
        type: { type: String, optional: true, alias: 't', description: 'Data type' },
        domain: { type: String, optional: true, alias: 'd', description: 'Domains such as nlp, ranking, vectorDB' },
        help: { type: Boolean, optional: true, alias: 'h', description: 'Prints this usage guide' },
    },
    {
        helpArg: 'help',
        headerContentSections: [{ header: 'My Example Config', content: 'Thanks for using Our Awesome Library' }],
        footerContentSections: [{ header: 'Footer', content: `Copyright: Big Faceless Corp. inc.` }],
    },
);

console.log(args)
// examples


async function process(args) {
    if (args.make === MakeType.Error) {
        console.info('making error')
        const res = await makeUtils.makeError(args.name);
        // console.log(res);
        if(res.isOk()){
            console.info('Error created');
        } else {
            console.warn(res.error.message);
        }
    } else if (args.make === MakeType.Brand) {
        console.info('making brand')
        const res = await makeUtils.makeBrand(args.name, args.type, args.domain);
        // console.log(res);
        if(res.isOk()){
            console.info('Brand created');
        } else {
            console.warn(res.error.message);
        }
    
    } else {
        console.info("pass -h for a list of options")
    }
}

process(args);