'use client';

import { useState, useRef, useEffect } from 'react';
import { FaVideo, FaMicrophone, FaVideoSlash, FaMicrophoneSlash } from 'react-icons/fa';

export default function ConsultDoctor() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      streamRef.current = stream;
      setIsCallActive(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Could not access camera or microphone. Please check your permissions.');
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
      }
    }
  };

  const endCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
    }
    setIsCallActive(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-dark mb-6">Video Consultation</h2>
      
      <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-6" style={{ height: '400px' }}>
        {isCallActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-800">
            <p className="text-white text-lg">Waiting to start consultation...</p>
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-4">
        {!isCallActive ? (
          <button
            onClick={startCall}
            className="flex items-center bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition"
          >
            <FaVideo className="mr-2" />
            Start Consultation
          </button>
        ) : (
          <>
            <button
              onClick={toggleVideo}
              className={`flex items-center px-4 py-2 rounded-full ${
                isVideoOn ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {isVideoOn ? <FaVideo className="mr-2" /> : <FaVideoSlash className="mr-2" />}
              {isVideoOn ? 'Video On' : 'Video Off'}
            </button>
            <button
              onClick={toggleAudio}
              className={`flex items-center px-4 py-2 rounded-full ${
                isAudioOn ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {isAudioOn ? <FaMicrophone className="mr-2" /> : <FaMicrophoneSlash className="mr-2" />}
              {isAudioOn ? 'Audio On' : 'Audio Off'}
            </button>
            <button
              onClick={endCall}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
            >
              End Call
            </button>
          </>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>• Make sure you have a stable internet connection</p>
        <p>• Find a quiet, well-lit space for the consultation</p>
        <p>• Have your medical records ready if needed</p>
      </div>
    </div>
  );
} 