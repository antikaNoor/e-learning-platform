// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useRecordWebcam, Recording } from 'react-record-webcam';
import { BsBroadcast } from 'react-icons/bs';
import { useForm, Controller } from 'react-hook-form';
import useCourse from '../../hooks/useCourseHooks';
import { useSelector } from 'react-redux';

type LessonID = {
    lessonID?: string;
    onRecordingComplete: (recordedData: { videoTitle: string; videoLink: File }) => void;
};

const ReacordVideoAtom: React.FC<LessonID> = ({ lessonID, onRecordingComplete }) => {
    const {
        activeRecordings,
        cancelRecording,
        clearPreview,
        closeCamera,
        createRecording,
        devicesByType,
        devicesById,
        download,
        muteRecording,
        openCamera,
        pauseRecording,
        resumeRecording,
        startRecording,
        stopRecording,
    } = useRecordWebcam();

    const { addVideo } = useCourse();

    const [videoDeviceId, setVideoDeviceId] = useState<string>('');
    const [audioDeviceId, setAudioDeviceId] = useState<string>('');
    const [stoped, setStoped] = useState(false);
    const [recordedFiles, setRecordedFiles] = useState([]);

    const state = useSelector((state: any) => state.user);
    const checkString = state.token;

    const handleSelect = async (event: any) => {
        const { deviceid: deviceId } =
            event.target.options[event.target.selectedIndex].dataset;
        if (devicesById[deviceId].type === "videoinput") {
            setVideoDeviceId(deviceId);
        }
        if (devicesById[deviceId].type === "audioinput") {
            setAudioDeviceId(deviceId);
        }
    };

    const start = async () => {
        const recording = await createRecording(videoDeviceId, audioDeviceId);
        if (recording) await openCamera(recording.id);
    };

    const stop = async () => {
        if (activeRecordings.length > 0) {
            const recording = activeRecordings[0];
            const chunks = [];
            const mimeType = recording.mimeType;
            recording.recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };
            recording.recorder.onstop = () => {
                const blob = new Blob(chunks, { type: mimeType });
                const file = new File([blob], `${recording.fileName}.${recording.fileType}`, {
                    type: mimeType,
                });

                const recordedData = {
                    videoTitle: `${recording.fileName}`,
                    videoLink: file,
                };

                onRecordingComplete(recordedData);
                setRecordedFiles([file]);
                setStoped((prev) => !prev);
                cancelRecording(recording.id);
            };
            recording.recorder.stop();
        }
    }

    const handlePreview = async (recordingId) => {
        const recording = activeRecordings.find((rec) => rec.id === recordingId);
        if (recording) {
            const blob = new Blob([recording.videoBlob], { type: 'video/webm' });
            const videoURL = URL.createObjectURL(blob);
            recording.previewRef.current.src = videoURL;
            console.log("videoUrl", videoURL);
        }
    };

    // console.log("recordings", recordedFiles);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            videoTitle: '',
            videoLink: [] as unknown as FileList,
        },
    });

    console.log("lessonid from video atom", lessonID);

    const handleAddVideoApi = async () => {
        const formData = new FormData();
        formData.append("videoTitle", recordedFiles[0].name);
        formData.append("videoLink", recordedFiles[0]);
        if (lessonID) {
            await addVideo(lessonID, formData, checkString);
        }
        else {
            toast.error("Please submit the lesson first")
        }
    }

    useEffect(() => {
        //api call
        handleAddVideoApi()
    }, [lessonID, checkString]);


    return (
        <div>
            <div className="flex gap-10">
                <div>
                    <h4 className="text-xl font-semibold">Select video input</h4>
                    <select
                        className="bg-gray-200 p-1 rounded focus:outline-none"
                        onChange={handleSelect}
                    >
                        {devicesByType?.video?.map((device) => (
                            <option key={device.deviceId} data-deviceid={device.deviceId}>
                                {device.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <h4 className="text-xl font-semibold">Select audio input</h4>
                    <select
                        className="bg-gray-200 p-1 rounded focus:outline-none"
                        onChange={handleSelect}
                    >
                        {devicesByType?.audio?.map((device) => (
                            <option key={device.deviceId} data-deviceid={device.deviceId}>
                                {device.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <button className="mt-2 bg-blue-500 text-white p-1 rounded" onClick={start}>
                    Open camera
                </button>
            </div>
            <div className="devices">
                {activeRecordings?.map((recording: Recording) => (
                    <div className="device" key={recording.id}>
                        <div className="flex items-center">
                            <BsBroadcast size={22} className="mr-2 text-red-600 live-animation" />
                            <p className="text-lg">Live</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <small>Status: {recording.status}</small>
                            <small>Video: {recording.videoLabel}</small>
                            <small>Audio: {recording.audioLabel}</small>
                        </div>
                        <video ref={recording.webcamRef} loop autoPlay playsInline />
                        <div className="flex gap-2 mt-2">
                            <button
                                disabled={
                                    recording.status === "RECORDING" ||
                                    recording.status === "PAUSED"
                                }
                                onClick={() => startRecording(recording.id)}
                                className="bg-green-600 text-white p-1 rounded"
                            >
                                Record
                            </button>
                            <button
                                disabled={
                                    recording.status !== "RECORDING" &&
                                    recording.status !== "PAUSED"
                                }
                                onClick={() =>
                                    recording.status === "PAUSED"
                                        ? resumeRecording(recording.id)
                                        : pauseRecording(recording.id)
                                }
                                className="bg-gray-300 text-gray-800 p-1 rounded"
                            >
                                {recording.status === "PAUSED" ? "Resume" : "Pause"}
                            </button>
                            <button
                                className={`bg-red-600 text-white p-1 rounded ${recording.isMuted ? "selected" : ""}`}
                                onClick={() => muteRecording(recording.id)}
                            >
                                Mute
                            </button>

                            <button
                                disabled={recording.status !== "RECORDING"}
                                onClick={() => stop()}
                                className="bg-gray-300 text-gray-800 p-1 rounded"
                            >
                                Stop
                            </button>
                            <button onClick={() => cancelRecording(recording.id)}
                                className="bg-gray-300 text-gray-800 p-1 rounded">
                                Cancel
                            </button>
                        </div>
                        <div className="preview">
                            {/* <p>Preview</p> */}
                            <button onClick={() => handlePreview(recording.id)}
                                className="text-blue-800 rounded">Preview</button>
                            <video ref={recording.previewRef} loop playsInline />
                            <div className="controls">
                                <button onClick={() => download(recording.id)}
                                    className="bg-blue-500 text-white p-1 rounded">Download</button>
                                <button onClick={() => clearPreview(recording.id)} className="text-red-600 p-1 rounded">
                                    Clear preview
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default ReacordVideoAtom;
