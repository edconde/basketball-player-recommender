export interface IPlayerRecomendado extends IPlayer {
    Score: number
}

export interface IPlayer {
    _id: string,
    Name: string,
    Team: string,
    Position: string,
    Overall: number,
    "Outside Scoring": number,
    "Close Shot": number,
    "Mid-Range Shot": number,
    "Three-Point Shot": number,
    "Free Throw": number,
    "Shot IQ": number,
    "Offensive Consistency": number,
    Athleticism: number,
    Speed: number,
    Acceleration: number,
    Strength: number,
    Vertical: number,
    Stamina: number,
    Hustle: number,
    "Overall Durability": number,
    "Inside Scoring": number,
    Layup: number,
    "Standing Dunk": number,
    "Driving Dunk": number,
    "Post Hook": number,
    "Post Fade": number,
    "Post Control": number,
    "Draw Foul": number,
    Hands: number,
    Playmaking: number,
    "Pass Accuracy": number,
    "Ball Handle": number,
    "Speed with Ball": number,
    "Pass IQ": number,
    "Pass Vision": number,
    Defending: number,
    "Interior Defense": number,
    "Perimeter Defense": number,
    Steal: number,
    Block: number,
    "Lateral Quickness": number,
    "Help Defense IQ": number,
    "Pass Perception": number,
    "Defensive Consistency": number,
    Rebounding: number,
    "Offensive Rebound": number,
    "Defensive Rebound": number,
    Intangibles: number,
    Potential: number,
    "Total Attributes": string,
    "Pertenencia Cluster 0": number,
    "Pertenencia Cluster 1": number,
    "Pertenencia Cluster 2": number,
    "Pertenencia Cluster 3": number,
    "Basketball Reference Id": string,
    "Plus/Minus PG Cluster 0": number,
    "Shared Time PG Cluster 0": number,
    "Plus/Minus PG Cluster 1": number,
    "Shared Time PG Cluster 1": number,
    "Plus/Minus PG Cluster 2": number,
    "Shared Time PG Cluster 2": number,
    "Plus/Minus PG Cluster 3": number,
    "Shared Time PG Cluster 3": number,
    "Plus/Minus SG Cluster 0": number,
    "Shared Time SG Cluster 0": number,
    "Plus/Minus SG Cluster 1": number,
    "Shared Time SG Cluster 1": number,
    "Plus/Minus SG Cluster 2": number,
    "Shared Time SG Cluster 2": number,
    "Plus/Minus SG Cluster 3": number,
    "Shared Time SG Cluster 3": number,
    "Plus/Minus SF Cluster 0": number,
    "Shared Time SF Cluster 0": number,
    "Plus/Minus SF Cluster 1": number,
    "Shared Time SF Cluster 1": number,
    "Plus/Minus SF Cluster 2": number,
    "Shared Time SF Cluster 2": number,
    "Plus/Minus SF Cluster 3": number,
    "Shared Time SF Cluster 3": number,
    "Plus/Minus PF Cluster 0": number,
    "Shared Time PF Cluster 0": number,
    "Plus/Minus PF Cluster 1": number,
    "Shared Time PF Cluster 1": number,
    "Plus/Minus PF Cluster 2": number,
    "Shared Time PF Cluster 2": number,
    "Plus/Minus PF Cluster 3": number,
    "Shared Time PF Cluster 3": number,
    "Plus/Minus C Cluster 0": number,
    "Shared Time C Cluster 0": number,
    "Plus/Minus C Cluster 1": number,
    "Shared Time C Cluster 1": number,
    "Plus/Minus C Cluster 2": number,
    "Shared Time C Cluster 2": number,
    "Plus/Minus C Cluster 3": number,
    "Shared Time C Cluster 3": number,
    ImgUrl: string,
}