import scss from 'rollup-plugin-scss';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy2';
import zip from 'rollup-plugin-zip';

const releaseBuild = true;
const destinationDir = 'dist';

const toBundle = [
    'template.json',
    'system.json',
    'cypher.css',
    "fonts/ogirema.ttf",
    "fonts/source.txt",
    "lib/dragula/dragula.min.css",
    "lib/dragula/dragula.min.js",
    "templates/characterSheet.html",
    "templates/npcSheet.html",
    "templates/item/abilitySheet.html",
    "templates/item/armorSheet.html",
    "templates/item/artifactSheet.html",
    "templates/item/cypherSheet.html",
    "templates/item/equipmentSheet.html",
    "templates/item/skillSheet.html",
    "templates/item/weaponSheet.html",

    // Graphics for macros need to be specifically listed here
    "graphics/icons/eye.svg",

    "LICENSE"
];

export default [{
    input: 'cypher.js',
    output: {
        dir: destinationDir,
        format: 'umd',
    },
    plugins: [
        terser({
            sourcemap: !releaseBuild,
            compress: releaseBuild ? {} : false,
        }),
        scss({
            failOnError: true,
            output: true,
        }),
        copy({
            assets: toBundle,
        }),
        zip({
            dir: destinationDir,
        }),
    ],
}, ];