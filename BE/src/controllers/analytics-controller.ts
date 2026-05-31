import type { Request } from "express";
import { prisma } from "../prismaClient.js";

class AnalyticsController {
  async getOverdueTasksPerUser(req: Request) {
    try {
      const rawQuery = `SELECT assignee AS user_id,
       COUNT(*) AS overdue_tasks_count
       FROM tasks
       WHERE status != 'DONE'
       AND due_date < NOW()
       GROUP BY assignee`;
      const data: any = await prisma.$queryRawUnsafe(rawQuery);
      const formattedData = data.map((row: any) => ({
        user_id: Number(row.user_id),
        overdue_tasks_count: Number(row.overdue_tasks_count),
      }));
      return formattedData;
    } catch (error) {
      throw error;
    }
  }

  async getAverageTaskCompletionTime(req: Request) {
    try {
      const whereCondition: any = {
        deleted_at: null,
        deleted_by: null,
        completed_at: { not: null },
      };
      if (req.query.assigneeId) {
        whereCondition.assignee = Number(req.query.assigneeId);
      }
      const tasks = await prisma.task.findMany({
        where: whereCondition,
        select: {
          started_at: true,
          completed_at: true,
        },
      });
      if (tasks.length === 0)
        return { averageCompletedTaskCompletionTime: 0, units: "hour" };

      const completionTimes = tasks.map((task: any) => {
        const start = task.started_at.getTime();
        const completed = task.completed_at!.getTime();
        return (completed - start) / 1000 / 60 / 60;
      });

      let totalHours = 0;
      for (const hours of completionTimes) {
        totalHours += hours;
      }

      const averageHours = totalHours / tasks.length;
      return {
        averageCompletedTaskCompletionTime: averageHours,
        units: "hour",
      };
    } catch (error) {
      throw error;
    }
  }
}

export default AnalyticsController;
