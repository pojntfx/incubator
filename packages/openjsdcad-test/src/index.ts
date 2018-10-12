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

interface IShelve {
  x: number;
  y: number;
  z: number;
  t: {
    x: number;
    y: number;
    z: number;
  };
  r: {
    x: number;
    y: number;
    z: number;
  };
}

const shelves: IShelve[] = [
  {
    x: 170,
    y: 100,
    z: 50,
    t: {
      x: 150,
      y: 0,
      z: 100 / 2
    },
    r: {
      x: 90,
      y: 0,
      z: 90
    }
  },
  {
    x: 105,
    y: 90,
    z: 60,
    t: {
      x: 0,
      y: -60,
      z: 90 / 2
    },
    r: {
      x: 90,
      y: 0,
      z: 0
    }
  },
  {
    x: 140,
    y: 45,
    z: 25,
    t: {
      x: -(85 - 45),
      y: (170 - 140) / 2 + 50,
      z: 45 / 2 + 50
    },
    r: {
      x: 90,
      y: 0,
      z: 90
    }
  },
  {
    x: 170,
    y: 25,
    z: 15,
    t: {
      x: -(170 / 2 - 40),
      y: (170 - 140) / 2,
      z: 25 / 2 + 50 + 25 + 40
    },
    r: {
      x: 90,
      y: 0,
      z: 90
    }
  },
  {
    x: 155,
    y: 40,
    z: 20,
    t: {
      x: -(155 / 2 - 35),
      y: (155 - 140) / 2 + 50,
      z: 40 / 2 + 50 + 25 + 40 + 15 + 30
    },
    r: {
      x: 90,
      y: 0,
      z: 90
    }
  }
];

const floor = translate(
  [0, 0, -5],
  cube({ size: [500, 500, 5], center: true })
);

const backWall = translate(
  [-55, 0, 0],
  rotate([0, 90, 0], cube({ size: [500, 500, 5], center: true }))
);

let main = () => [
  ...shelves.map(({ x, y, z, t, r }) =>
    translate([t.x, t.y, t.z], rotate([r.x, r.y, r.z], shelf(x, y, z)))
  ),
  floor,
  backWall
];

export { main };
