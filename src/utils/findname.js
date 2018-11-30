export function findname(data, serac) {
  const fina = [];
  serac.split(',').map((item, i) => {
    data.map((item1, i) => {
      if (item1.key === item) {
        fina.push(item1.title);
      }
      if (item1.children) {
        item1.children.map((item2, i) => {
          if (item2.key === item) {
            fina.push(item2.title);
          }
        });
      }
    });
  });

  return fina;
}


// export function findkey(data, serac) {
//   const fina = [];
//   if (Array.isArray(serac)) {
//     serac.map((item, i) => {
//       data.map((item1, i) => {
//         if (item1.title === item) {
//           fina.push(item1.key);
//         }
//         if (item1.children) {
//           item1.children.map((item2, i) => {
//             if (item2.title === item) {
//               fina.push(item2.key);
//             }
//           });
//         }
//       });
//     });
//   }
//   else {
//     data.map((item1, i) => {
//       if (item1.title === serac) {
//         fina.push(item1.key);
//       }
//       if (item1.children) {
//         item1.children.map((item2, i) => {
//           if (item2.title === serac) {
//             fina.push(item2.key);
//           }
//         });
//       }
//     });
//   }
//
//   return fina;
// }


export const deviceTypeList = [
  {
    key: 'NOTEBOOK',
    value: '笔记本',
  },
  {
    key: 'MONITOR',
    value: '显示器',
  },
  {
    key: 'HOST',
    value: '台式机',
  },
  {
    key: 'UIONMAC',
    value: '一体机',
  },
];


export const deviceTypeAllName = {
  NOTEBOOK: '笔记本',
  MONITOR: '显示器',
  HOST: '台式机',
  UIONMAC: '一体机',
};

