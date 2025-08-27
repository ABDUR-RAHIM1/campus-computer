import DataNotFound from "@/components/DataNotFound";
import { getOneJobProfileByAdmin } from "@/handlers/profile";
import ProfileDetails from "@/components/jobProfileDetails/jobProfileDetails";

export default async function JobProfileDetails({ params }) {
    const { jpId } = await params;
    const { status, data } = await getOneJobProfileByAdmin(jpId);

    if (status !== 200 || !data) {
        return <DataNotFound />;
    };


    return <ProfileDetails data={data} />
}
