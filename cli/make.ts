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
    help?: boolean;
}

export const args = parse<Make>( 
    {
        make: { type: String, alias: 'm', description: 'Type of make'},
        name: { type: String, alias: 'n', description: 'Copies files rather than moves them' },
        help: { type: Boolean, optional: true, alias: 'h', description: 'Prints this usage guide' },
    },
    {
        helpArg: 'help',
        headerContentSections: [{ header: 'My Example Config', content: 'Thanks for using Our Awesome Library' }],
        footerContentSections: [{ header: 'Footer', content: `Copyright: Big Faceless Corp. inc.` }],
    },
);

console.log(args)
if (args.make === MakeType.Error) {
    console.info('making error')
    makeUtils.makeError(args.name).then((res) => {
        
        if (res) {
            console.info('Error created');
        } else {
            console.warn('Error already exists');
        }
        
    });
}