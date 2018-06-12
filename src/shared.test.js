import { findRecursiveById, initialMap, grow } from './shared';

const data = {
  lines: [
    {
      id: 1,
      label: '1 first line',
      acc: 15,
      dem: 15,
      show: true,
      children: [
        {
          id: 2,
          label: '2 first line',
          acc: 2,
          dem: 2,
          show: true,
          children: [
            {
              id: 3,
              label: '3 first line',
              acc: 3,
              dem: 3,
              show: true,
              children: [],
            },
            {
              id: 4,
              label: '3 second line',
              acc: 4,
              dem: 4,
              show: true,
              children: [],
            },
          ],
        },
        {
          id: 5,
          label: '2 second line',
          acc: 5,
          dem: 5,
          show: true,
          children: [
            {
              id: 6,
              label: '3 first line',
              acc: 6,
              dem: 6,
              show: true,
              children: [],
            },
            {
              id: 7,
              label: '3 second line',
              acc: 7,
              dem: 7,
              show: true,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 10,
      label: '1 first line',
      acc: 10,
      dem: 10,
      show: true,
      children: [
        {
          id: 12,
          label: '2 first line',
          acc: 12,
          dem: 12,
          show: true,
          children: [
            {
              id: 13,
              label: '3 first line',
              acc: 13,
              dem: 13,
              show: true,
              children: [],
            },
            {
              id: 14,
              label: '3 second line',
              acc: 14,
              dem: 14,
              show: true,
              children: [],
            },
          ],
        },
        {
          id: 15,
          label: '2 second line',
          acc: 15,
          dem: 15,
          show: true,
          children: [
            {
              id: 16,
              label: '3 first line',
              acc: 16,
              dem: 16,
              show: true,
              children: [],
            },
            {
              id: 17,
              label: '3 second line',
              acc: 17,
              dem: 17,
              show: true,
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

test('returns the desired object by its id', () => {
  expect(findRecursiveById(data.lines, 1)).toMatchObject({ id: 1 });
  expect(findRecursiveById(data.lines, 2)).toMatchObject({ id: 2 });
  expect(findRecursiveById(data.lines, 17)).toMatchObject({ id: 17 });
});

test('update parent value with leaves sum', () => {
  const calculatedValues = data.lines.map(initialMap);
  expect(calculatedValues[0]).toMatchObject({ id: 1, acc: 20, dem: 20 });
  expect(calculatedValues[0].children[0]).toMatchObject({ id: 2, acc: 7, dem: 7 });
  expect(calculatedValues[1]).toMatchObject({ id: 10, acc: 60, dem: 60 });
  expect(calculatedValues[1].children[0]).toMatchObject({ id: 12, acc: 27, dem: 27 });
});

test('grow a string', () => {
  expect(grow('123456789')).toBe('123 456 789');
});

test('grow a number', () => {
  expect(grow(123456789)).toBe('123 456 789');
});
