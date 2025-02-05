import axios from 'axios';

const secondaryApiClient = axios.create({
  baseURL: 'https://cdn.velev.io',
});

export async function getJobs(category: string) {
  const response = await secondaryApiClient.get<Job[]>(`/jobs/${category}`);
  return response.data;
}

export type Job = {
  id: number;
  name: string;
  companyName: string;
  companyLogo: string;
  thumbnail: string;
  url: string;
  jobId: number;
  summary: string;
};
