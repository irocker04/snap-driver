import {createAction} from "../utils";
import * as Regions from "../constants/regions";

const GetRegions = createAction(Regions.GetRegions.REQUEST);

export default {
    GetRegions
}
