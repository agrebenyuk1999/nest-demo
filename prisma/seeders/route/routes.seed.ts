import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import {cloneDeep, drop, each, filter, first, get, last, map, size} from "lodash";
import {CATEGORY} from "../../../src/glossary/glossary.constants";

export default class RoutesSeed {
  async seed(prisma: PrismaClient) {
    const content = fs.readFileSync(__dirname + '/data.json', 'utf-8')
    const data = JSON.parse(content);

    const price = await prisma.glossary.findFirst({
      where: {
        category: CATEGORY.COST,
      }
    })

    const ts = await prisma.glossary.findMany({
      where: {
        category: CATEGORY.TRANSPORT_TYPE,
      }
    })

    let transports = {};
    each(ts, (t) => {
      transports[t.value] = t.id;
    })
    // console.log(transports);

    const items = [];
    each(data, (items_0, transportTypeName) => {
      each(items_0, (items_1, route_number) => {
        const item = {
          transport_type_id: transports[transportTypeName],
          ticket_price_id: price.id,
          ticket_duration: 60,
          name: null,
          number: route_number,
          forward_geo_path: null,
          backward_geo_path: null,
          stops: {
            forward: [],
            backward: [],
          },
        }
        each(items_1, (v, k) => {
          if (k === 'stops') {
            // console.log(transportTypeName, route_number, size(v.forward), size(v.backward))
            const firstStop = first(v.forward);
            const lastStop = last(v.forward);
            item.name = `${get(firstStop, 'n', '')} - ${get(lastStop, 'n', '')}`;
            item.stops.forward = map(v.forward, (s, num) => ({
              name: s.n,
              order: num + 1,
              x: '' + s.x,
              y: '' + s.y,
            }));
            item.stops.backward = map(v.backward, (s, num) => ({
              name: s.n,
              order: num + 1,
              x: '' + s.x,
              y: '' + s.y,
            }));
          }
          if (k === 'scheme') {
            item.forward_geo_path = v.forward;
            item.backward_geo_path = v.backward;
          }
        })
        items.push(item);
      })
    })

    await prisma.routeStop.deleteMany({});
    await prisma.route.deleteMany({});

    each(items, async (item) => {
      await prisma.route.upsert({
        where: {
          id: 0,
        },
        update: {},
        create: {
          number: item.number,
          name: item.name,
          transport_type_id: item.transport_type_id,
          ticket_price_id: item.ticket_price_id,
          ticket_duration: item.ticket_duration,
          forward_geo_path: item.forward_geo_path,
          backward_geo_path: item.backward_geo_path,
          forward_stops: {
            create: item.stops.forward
          },
          backward_stops: {
            create: item.stops.backward,
          },
        },
      });
    });

  }
}
