export interface IPoint {
    x: number,
    y: number,
    color?: string
}

export interface IConfig {
    abscissa: string;
    ordinate: string;
    pointsConfig: IPointsConfig
}

export interface IPointsConfig {
    // Should the points be filled or not
    fill: boolean;
    // The radius of the point in scaled units
    radius: number;
}