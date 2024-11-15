import { PageToHtmlTask } from '@/lib/workflow/task/PageToHtml';
import { ExecutionEnvironment } from '@/types/executor';

export async function PageToHtmlExecutor(
  environment: ExecutionEnvironment<typeof PageToHtmlTask>
): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput('Html', html);
    return true;
  } catch (error: unknown) {
    environment.log.error(
      error instanceof Error ? error.message : String(error)
    );
    return false;
  }
}
