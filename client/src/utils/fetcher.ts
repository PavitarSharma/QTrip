import axios from "axios";
import { axiosPrivate } from "../http";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const privateFetcher = (url: string) =>
  axiosPrivate.get(url).then((res) => res.data);

export default fetcher;
