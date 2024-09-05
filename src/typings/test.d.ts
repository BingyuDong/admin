declare global {
    interface AdPosition {
        adPositionId: number;
        adPositionName: string;
        width: number;
        height: number;
        adPositionKey: string;
    }
    interface AdPositionPager {
    }
    interface AddAdPosition {
        adPositionName: string;
        width: number;
        height: number;
        adPositionKey: string;
    }

    interface UpdateAdPosition {
        adPositionId: number;
        adPositionName: string;
        width: number;
        height: number;
        adPositionKey: string;
    }
}

export { }