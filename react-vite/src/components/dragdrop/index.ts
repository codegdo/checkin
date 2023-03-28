export * from './dragdrop.component';
export * from './drag.item';
export * from './dragdrop.type';


/*
I'm a bit late to the party but I think I came up with a simple (and "hacky") solution to the problem. Basically you need to create 2 functional React components and place them inside your DnD wrapper. Each one of these components will return a div that is a drop target for the draggable item. Position them at the top and at the bottom of the browser window with the help of CSS. By listening for the isOver event you can detect if a draggable item is (hovering) over these 2 fixed drop targets and scroll the page (or the parent container element) accordingly. To finish, render these divs conditionally by listening for the isDragging event on the draggable items (so they are only there if a user is dragging an item i.e. isDragging === true). Code for reference:

const [{ isDragging }, drag, preview] = useDrag({
    ...
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
    ...
});
function ScrollTopDropTarget() {
    const scrollUp = () => {
        window.scrollBy(0, -10);
    };

    const scrollTopDropRef = useRef(null);
    const [{ isOver }, drop] = useDrop({
        accept: "your drag item type here",
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    drop(scrollTopDropRef);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isOver) {
                scrollUp();
            } else {
                clearInterval(intervalId);
            }
        }, 10);

        return () => {
            clearInterval(intervalId);
        };
    }, [isOver]);

    return <div ref={scrollTopDropRef} className={styles.scrollTopGuide} />;
}
function ScrollBottomDropTarget() {
    const scrollDown = () => {
        window.scrollBy(0, 10);
    };

    const scrollBottomDropRef = useRef(null);
    const [{ isOver }, drop] = useDrop({
        accept: "your drag item type here",
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    drop(scrollBottomDropRef);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isOver) {
                scrollDown();
            } else {
                clearInterval(intervalId);
            }
        }, 10);

        return () => {
            clearInterval(intervalId);
        };
    }, [isOver]);

    return (
        <div ref={scrollBottomDropRef} className={styles.scrollBottomGuide} />
    );
}
.scrollTopGuide {
    position: fixed;
    z-index: 1010;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    width: 100%;
}

.scrollBottomGuide {
    position: fixed;
    z-index: 1010;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    width: 100%;
}
By no means do I insist that this is a perfect solution but at the very least it is one. Feel free to iterate over it and make it better...
*/