import { serverHttp } from "./http";
import './websocket'
const PORT = 3333

serverHttp.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
