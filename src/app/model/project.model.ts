export class Project {
  constructor(
    public projectID: number,
    public title: string,
    public skill: number,
    public problemStmt: string,
    public outcome: number,
    public description: string,
    public studentID: number,
  ) {}
}
