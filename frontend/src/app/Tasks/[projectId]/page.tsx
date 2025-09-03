import TaskContainer from "@/app/components/taskContainer";

export default async function Page({ params }: { params: { projectId: string } }) {
  const { projectId } = await params;
  return <TaskContainer projectId={projectId} />;
}
