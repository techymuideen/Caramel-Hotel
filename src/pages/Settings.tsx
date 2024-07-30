import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";

function Settings() {
  return (
    <div>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </div>
  );
}

export default Settings;
