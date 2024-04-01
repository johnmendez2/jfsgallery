import rma from '../assets/realmadrid2014.png';
import mbappe from '../assets/mbappeframed.png';
import messi from '../assets/messiframed.png';
import ronaldo from '../assets/ronaldoframed.png';
import Shirt from "./shirtClass";

const shirt1 = new Shirt(
  rma, // Assuming frameImage is just a single image, not an array
  [],
  '$100-$200',
  'REAL MADRID 14/15 THIRD *ACADEMY ISSUE*',
  'Shirt 1 Subtitle',
  'Description for Shirt 1'
);

const shirt2 = new Shirt(
  mbappe,
  [],
  '$100-$200',
  'PSG 17/18 MBAPPE *PLAYER VERSION*',
  'Shirt 2 Subtitle',
  'Description for Shirt 2'
);

const shirt3 = new Shirt(
  messi,
  [],
  '$100-$200',
  'FC BARCELONA 07/08 MESSI *MATCH ISSUE*',
  'Shirt 3 Subtitle',
  'Description for Shirt 3'
);

const shirt4 = new Shirt(
  ronaldo,
    [],
    '$100-$200',
    'MANCHESTER UNITED 03/04 RONALDO',
    'Shirt 3 Subtitle',
    'Description for Shirt 3'
  );

const shirtsArray = [shirt1, shirt2, shirt3, shirt4];

export default shirtsArray;
