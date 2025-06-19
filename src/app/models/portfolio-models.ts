export interface Project {
    title: string;
    description: string;
    link: string;
    image: string;
    skill: string;
    technology: string;
}

export interface PlotlyBarChartData {
    x: string[];
    y: number[];
    title: string;
    height: number;
}

export interface PlotlyPieChartData {
    labels: string[];
    values: number[];
    title: string;
}

export interface Career {
    type: string; // Job | Student | Volunteer
    position: string; // [Job Title] | [Name of Degree Qualification]
    company: string; // [Name of Employer] | [Name of Educational Institution]
    startDate: string;
    endDate: string; // [End Date] | Current
    location: string;
    description: string[]; // Job highlights and/or list of educational activities, extracurriculars, etc.
    skills: string[]; // Soft skills
    link: string; // External link containing detailed account of achievements & responsabilities,
    logo: string; // Company/Educational Institution logo
    fulltime: boolean; // Job/Student/Volunteer Experience was full-time or part-time
    technical: boolean; // Experience was technical or not technical
}

export interface CareerView extends Career {
    parsedStartDate: number;
    parsedEndDate: number;
    yearsOfExperience: number;
}