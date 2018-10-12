import * as csg from "@jscad/csg/api";

const {
  booleanOps: { difference },
  primitives3d: { cube },
  transformations: { translate, rotate }
} = csg;

const shelf = (x, y, z) =>
  difference(
    cube({ size: [x, y, z], center: true }),
    cube({ size: [x - 8, y - 8, z], center: true })
  );

const a = translate([150, 0, 0], rotate([90, 0, 90], shelf(170, 100, 50)));

const b = translate(
  [0, -60, -(100 - 90) / 2],
  rotate([90, 0, 0], shelf(105, 90, 60))
);

let main = () => [a, b];

export { main };
