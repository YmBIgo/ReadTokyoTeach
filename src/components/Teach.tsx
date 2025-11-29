import Box from "@mui/material/Box";
import type { Info, InfoDetail } from "../type/Info";
import Input from "@mui/material/Input";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextareaAutosize } from "@mui/material";
import { convertTree } from "../util/convertTree";
import type { Leaf, Tree } from "../type/Tree";
import { traverseDepthTree } from "../util/traverseTree";
import { useNavigate } from "react-router";

type TreeVisualizerProps = {
    treeNow: Tree;
    currentLeaf: Leaf;
    parentLeaf: Leaf;
    indent: number;
    foldedLeaves: string[];
    isFolded: boolean;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    setInfoDetails: Dispatch<SetStateAction<InfoDetail>>;
    setFoldedLeaves: Dispatch<SetStateAction<string[]>>;
    setCurrentLeaf: Dispatch<SetStateAction<Leaf | null>>;
}

const INDENT_SPACE = "　".repeat(4);

const TeachTreeVisualizer: React.FC<TreeVisualizerProps> = ({
    treeNow,
    currentLeaf,
    parentLeaf,
    indent,
    foldedLeaves,
    isFolded,
    setIsDialogOpen,
    setInfoDetails,
    setFoldedLeaves,
    setCurrentLeaf
}) => {
    const onClickId = () => {
        if (foldedLeaves.includes(treeNow.content.id)) {
        removeFolded();
        }
        setCurrentLeaf(treeNow.content);
    }
    const isRootLeafFolded = foldedLeaves.includes(treeNow.content.id);
    const isContainFunctionContentAndNotCurrent =
        treeNow.content.functionCodeContent ||
        (parentLeaf.id === currentLeaf.id) ||
        (treeNow.content.id === currentLeaf.id);
    const isLeafIdenticalToCurrent = treeNow.content.id === currentLeaf.id;
    const addFolded = () => {
        setFoldedLeaves((f) => [...f, treeNow.content.id]);
    };
    const removeFolded = () => {
        setFoldedLeaves((f) => {
            return f.filter((fchild) => fchild !== treeNow.content.id);
        });
    }
    return (
        <Box style={{
            display: !isContainFunctionContentAndNotCurrent || isFolded ? "none" : "inherit"
        }}>
            <p
                style={{
                    fontSize: "12px",
                    color: isLeafIdenticalToCurrent && !treeNow.content.functionCodeContent
                        ? "#FF000070"
                        : isLeafIdenticalToCurrent && treeNow.content.functionCodeContent
                            ? "red"
                            : !treeNow.content.functionCodeContent
                                ? "#AAAAAA"
                                : "black",
                }}
            >
                {isRootLeafFolded
                    ? <Box onClick={removeFolded}>
                        {INDENT_SPACE.repeat(indent)}
                        <span style={{ fontSize: "20px" }}>+</span>
                    </Box>
                    : isFolded
                        ? <></>
                        : <Box onClick={addFolded}>
                            {INDENT_SPACE.repeat(indent)}
                            <span style={{ fontSize: "20px" }}>-</span>
                        </Box>
                }
                <Box
                    sx={{
                        scrollMarginTop: "80px"
                    }}
                    onClick={onClickId}
                >
                    {INDENT_SPACE.repeat(indent)}{treeNow.content.functionName}
                    <br />
                    {INDENT_SPACE.repeat(indent)}{treeNow.content.id}
                    <br />
                    {INDENT_SPACE.repeat(indent)}{treeNow.content.comment?.slice(0, 20)}...
                </Box>
                {isLeafIdenticalToCurrent &&
                    <>
                        {INDENT_SPACE.repeat(indent)}
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => {
                                setIsDialogOpen(false);
                                setInfoDetails((ds) => {
                                    return {
                                        ...(ds ?? []),
                                        details: [...(ds.details ?? []), [treeNow.content.id, treeNow.content.functionName]]
                                    }
                                })
                            }}
                        >
                            選択する
                        </Button>
                    </>
                }
            </p>
            <>
                {treeNow.children.map((tc) => {
                    return (
                        <TeachTreeVisualizer
                            treeNow={tc}
                            indent={indent + 1}
                            currentLeaf={currentLeaf}
                            parentLeaf={treeNow.content}
                            foldedLeaves={foldedLeaves}
                            isFolded={isRootLeafFolded}
                            setIsDialogOpen={setIsDialogOpen}
                            setInfoDetails={setInfoDetails}
                            setFoldedLeaves={setFoldedLeaves}
                            setCurrentLeaf={setCurrentLeaf}
                        />
                    )
                })}
            </>
        </Box>
    )
}

type Props = {
    setInfo: Dispatch<SetStateAction<Info>>;
    setOriginalInput: Dispatch<SetStateAction<string>>;
}

const Teach: React.FC<Props> = ({
    setInfo,
    setOriginalInput
}) => {
    const [infoDetails, setInfoDetails] = useState<InfoDetail>({} as InfoDetail);
    const [inputTree, setInputTree] = useState<Tree | null>(null);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [currentLeaf, setCurrentLeaf] = useState<Leaf | null>(null);
    const [foldedLeaves, setFoldedLeaves] = useState<string[]>([]);
    //
    const navigate = useNavigate();
    // functions
    const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file)
        if (!file) return;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            let jsonContent = (fileReader.result || "{}") as string;
            setOriginalInput(jsonContent);
            try {
                const originalInputTree = convertTree(JSON.parse(jsonContent));
                setInputTree(originalInputTree);
                setCurrentLeaf(originalInputTree.content);
                const treeIds = traverseDepthTree(originalInputTree, 1, []);
                const deepIds = treeIds.filter((t) => t.depth > 2).map((di) => String(di.id));
                setFoldedLeaves(deepIds);
                setInfoDetails({} as InfoDetail);
            } catch (e) {
                console.error(e);
                setInputTree(null);
                setCurrentLeaf(null);
                setSnackbarMessage("ファイルのアップロードに失敗しました...");
            }
        }
        fileReader.readAsText(file);
    };
    return (
        <Box sx={{
            minWidth: "800px",
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid black",
            }}>
                <h3 style={{ margin: "0px 0px 5px" }}>read.tokyo</h3>
            </Box>
            <Box sx={{
                backgroundColor: "#AAAAAA40",
                padding: "10px"
            }}>
                <Box sx={{
                    border: "1px solid #CCC",
                    borderRadius: "10px",
                    margin: "10px",
                    padding: "20px",
                    backgroundColor: "white",
                }}>
                    <h3 style={{
                        margin: "0px 0px 10px",
                        backgroundColor: "#333",
                        color: "white",
                        padding: "10px",
                        borderRadius: "10px"
                    }}>
                        Step1：保存したコード再現のJSONファイルを１つ入力{"　"}
                    </h3>
                    <Input
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            onChangeFile(e)
                        }}
                        sx={{
                            padding: "10px 0"
                        }}
                    />
                    {!!inputTree?.content &&
                        <>
                            <h3 style={{
                                margin: "10px 0px 10px",
                                backgroundColor: "#333",
                                color: "white",
                                padding: "10px",
                                borderRadius: "10px"
                            }}>
                                Step2：保存したコード再現のJSONのメタデータを入力
                            </h3>
                            <Box sx={{
                                padding: "10px 0",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                gap: "40px"
                            }}>
                                <Box>
                                    <h3 style={{
                                        margin: "0px 0px 10px",
                                    }}>
                                        教材の名前を入力（「ログイン機能」など）
                                    </h3>
                                    <Input
                                        style={{
                                            width: "calc(40vw - 10px)"
                                        }}
                                    />
                                    <h3 style={{
                                        margin: "10px 0px 10px",
                                    }}>
                                        関数の全体像の説明を入力（任意）
                                    </h3>
                                    <TextareaAutosize
                                        minRows={15}
                                        maxRows={15}
                                        style={{
                                            width: "calc(45vw - 20px)"
                                        }}
                                        onChange={(e) => {
                                            setInfoDetails((d) => {
                                                return { ...d, summary: e.target.value }
                                            })
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <h3 style={{
                                        margin: "0px 0px 0px",
                                        width: "calc(50vw - 20px)"
                                    }}>
                                        重要な関数を入力{"　"}
                                        <Button
                                            onClick={() => {
                                                setIsDialogOpen(true);
                                            }}
                                        >
                                            重要な関数を追加
                                        </Button>
                                    </h3>
                                    {!!infoDetails.details?.length &&
                                        infoDetails.details.map((d: string[], i) => {
                                            return (
                                                <Box sx={{
                                                    display: "flex",
                                                    gap: "10px"
                                                }}>
                                                    <Input
                                                        style={{
                                                            width: "calc(20vw - 20px)"
                                                        }}
                                                        placeholder="重要な関数のサマリを入力"
                                                        value={d[1]}
                                                        size="small"
                                                        onChange={(e) => {
                                                            setInfoDetails((ds) => {
                                                                return {
                                                                    ...ds,
                                                                    details: ds.details.map((d, di) => {
                                                                        if (di === i) return [d[0], e.target.value];
                                                                        return d
                                                                    })
                                                                }
                                                            })
                                                        }}
                                                    />
                                                    <Input
                                                        style={{
                                                            width: "calc(20vw - 20px)"
                                                        }}
                                                        placeholder="重要な関数のハッシュ値を入力"
                                                        value={d[0]}
                                                        size="small"
                                                        disabled={true}
                                                    />
                                                    <Button
                                                        color="error"
                                                        onClick={() => {
                                                            setInfoDetails((ds) => {
                                                                return {
                                                                    ...ds,
                                                                    details: ds.details.filter((_, di) => {
                                                                        return di !== i
                                                                    })
                                                                }
                                                            })
                                                        }}
                                                    >
                                                        削除する
                                                    </Button>
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                            </Box>
                        </>
                    }
                    {
                        !!infoDetails?.details?.length &&
                        <>
                            <h3 style={{
                                margin: "0px 0px 10px",
                                backgroundColor: "#333",
                                color: "white",
                                padding: "10px",
                                borderRadius: "10px"
                            }}>
                                Step3：送信し教材を作成する{"　"}
                            </h3>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => {
                                    setInfo([infoDetails]);
                                    navigate("/teach/trees")
                                }}
                            >
                                教材を作成する
                            </Button>
                        </>
                    }
                </Box>
            </Box>
            <Snackbar
                open={!!snackbarMessage}
                autoHideDuration={5000}
                onClose={() => setSnackbarMessage("")}
                message={snackbarMessage}
            // action={<>{snackbarMessage}</>}
            />
            <Dialog
                open={isDialogOpen}
            >
                <DialogTitle
                    sx={{
                        borderBottom: "1px solid #333"
                    }}
                >
                    重要な関数経路を入力
                </DialogTitle>
                <DialogContent
                    sx={{
                        width: "80vw"
                    }}
                >
                    {!!inputTree && !!currentLeaf &&
                        <TeachTreeVisualizer
                            treeNow={inputTree}
                            currentLeaf={currentLeaf}
                            parentLeaf={inputTree.content}
                            indent={0}
                            foldedLeaves={foldedLeaves}
                            isFolded={false}
                            setCurrentLeaf={setCurrentLeaf}
                            setIsDialogOpen={setIsDialogOpen}
                            setInfoDetails={setInfoDetails}
                            setFoldedLeaves={setFoldedLeaves}
                        />
                    }
                </DialogContent>
                <DialogActions
                    sx={{
                        textAlign: "center"
                    }}
                    onClick={() => {
                        setIsDialogOpen(false);
                    }}
                >
                    <Button
                        color="success"
                        variant="contained"
                    >
                        閉じる
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Teach;