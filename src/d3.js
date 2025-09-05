//import * as _d3 from 'd3';  // comment this line to run locally with http-server
import * as _d3 from 'https://unpkg.com/d3?module'
export default typeof window === "object" && !!window.d3 ? window.d3 : _d3;
