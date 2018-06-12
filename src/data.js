import * as faker from 'faker/locale/fr';

const getLine = (depth = 1) => {
  const ret = [];

  if (depth < 4) {
    for (let i = 0; i < faker.random.number(25); i++) {
      ret.push({
        id: faker.random.uuid(),
        label: faker.random.words(),
        dem: faker.random.number(5000),
        acc: faker.random.number(5000),
        children: getLine(depth + 1),
      });
    }
  }

  return ret;
};

export const data = {
  lines: getLine(),
};

/* export const data = {
  lines: [
    {
      id: 1,
      label: '1 first line',
      value: 15,
      show: true,
      lines: [
        {
          id: 2,
          label: '2 first line',
          value: 5,
          show: true,
          lines: [
            {
              id: 3,
              label: '3 first line',
              value: 3,
              show: true,
              lines: [],
            },
            {
              id: 4,
              label: '3 second line',
              value: 2,
              show: true,
              lines: [],
            },
          ],
        },
        {
          id: 5,
          label: '2 second line',
          value: 10,
          show: true,
          lines: [
            {
              id: 6,
              label: '3 first line',
              value: 4,
              show: true,
              lines: [],
            },
            {
              id: 7,
              label: '3 second line',
              value: 6,
              show: true,
              lines: [],
            },
          ],
        },
      ],
    },
    {
      id: 10,
      label: '1 first line',
      value: 15,
      show: true,
      lines: [
        {
          id: 12,
          label: '2 first line',
          value: 5,
          show: true,
          lines: [
            {
              id: 13,
              label: '3 first line',
              value: 3,
              show: true,
              lines: [],
            },
            {
              id: 14,
              label: '3 second line',
              value: 2,
              show: true,
              lines: [],
            },
          ],
        },
        {
          id: 15,
          label: '2 second line',
          value: 10,
          show: true,
          lines: [
            {
              id: 16,
              label: '3 first line',
              value: 4,
              show: true,
              lines: [],
            },
            {
              id: 17,
              label: '3 second line',
              value: 6,
              show: true,
              lines: [],
            },
          ],
        },
      ],
    },
  ],
}; */
