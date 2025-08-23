import { BASE_URL } from "@/constans"; 

const staticPages = [
  "about-us",
  "services",
  "jobs", 
  "developer", 
];

export default async function sitemap() {
  const baseUrl = BASE_URL;

  // const { data: examData } = await getAllQuestionsForAdmin();
  // const { data: subCategories } = await getCategories();

  const urls = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 1,
    }
  ];

  // Static pages
  staticPages.forEach(page => {
    urls.push({
      url: `${baseUrl}/${page}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Dynamic exam details 
  // examData.forEach(item => {
  //   const slug = item.isAll
  //     ? 'all-subject'
  //     : (item.sub_categorie?.identifier || 'unknown-subject');

  //   urls.push({
  //     url: `${baseUrl}/exam/${encodeURIComponent(slug)}/${encodeURIComponent(item._id)}`,
  //     lastModified: item.updatedAt || new Date().toISOString(),
  //     changeFrequency: 'weekly',
  //     priority: 0.9,
  //   });
  // });



  //  Dynamic SubCategories
  // subCategories.forEach(item => {

  //   urls.push({
  //     url: `${baseUrl}/sub-categories/${item.identifier}`,
  //     lastModified: item.updatedAt || new Date().toISOString(),
  //     changeFrequency: 'weekly',
  //     priority: 0.9,
  //   });
  // });




  return urls;
}
