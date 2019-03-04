import { ProjectState } from '../../model';

const getTasksForProject =
  (state: ProjectState) =>
    (projectId: number) =>
      (state.projects[projectId] && state.projects[projectId].current)
        ? state.projects[projectId].current.tasks
          .map((id) => state.tasks[id])
          .sort((a, b) => a.name.localeCompare(b.name))
        : []
  ;

const getProject =
  (state: ProjectState) =>
    (projectId: number) => {
      const current = state.projects[projectId] && state.projects[projectId].current;
      return {
        ...current,
        tasks: getTasksForProject(state)(projectId),
      };
    };

const getLoadableProject =
  (state: ProjectState) =>
    (projectId: number) => {
      return state.projects[projectId];
    };

export default (state: ProjectState) => ({
  getTasksForProject: getTasksForProject(state),
  getProject: getProject(state),
  getLoadableProject: getLoadableProject(state),
});
