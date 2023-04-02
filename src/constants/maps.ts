/**
 * Map Extensions
 */
export enum Map {
  AMAP = 'amap',
  BMAP = 'bmap',
  GMAP = 'gmap',
  TMAP = 'tmap',
  JSON = 'json',
  NONE = 'none',
}

/**
 * Map Extensions Options
 */
export const MapOptions = [
  { value: Map.BMAP, label: 'Baidu' },
  { value: Map.AMAP, label: 'Gaode' },
  { value: Map.TMAP, label: 'QQ' },
  { value: Map.GMAP, label: 'Google' },
  { value: Map.JSON, label: 'JSON' },
  { value: Map.NONE, label: 'None' },
];

/**
 * API
 */
export const MapApi = {
  baidu: 'https://api.map.baidu.com/api',
  gaode: 'https://webapi.amap.com/maps',
  qq: 'https://map.qq.com/api/gljs',
  google: 'https://maps.googleapis.com/maps/api/js',
};
