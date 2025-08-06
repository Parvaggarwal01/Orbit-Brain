import { PlusIcon } from "./icons/PlusIcon";
import { Button } from "./components/button";
import { ShareIcon } from "./icons/ShareIcon";
// import { EarthIcon } from "./icons/EarthIcon";

function App() {
  return (
    <div>
      <Button
        variants="secondary"
        text="Share"
        size="md"
        startIcon={<PlusIcon size="lg" />}
        onClick={() => {}}
      ></Button>
      <Button
        variants="primary"
        text="Add Content"
        size="md"
        startIcon={<ShareIcon size="lg" />}
        onClick={() => {}}
      ></Button>
    </div>
  );
}

export default App;
