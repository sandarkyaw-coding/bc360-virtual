import { fetchChannels, addChannel } 
from "@/services/channel.service";

// get all channels
export async function GET() {
  try {
    const channels = await fetchChannels();
    return Response.json(channels);

  } catch (error) {
    console.error("Database operation failed: to get channels", error);
    return Response.json(
      {message: "Failed to get channels"},
      {status:500}
    );
  }
}

// create channel
export async function POST(request:Request){
    try{
        const body = await request.json();
        const channel = await addChannel(body);
        return Response.json(channel);
    } catch (error) {
    console.error("Database operation failed: to create channels", error);
    return Response.json(
      {message: "Failed to create channels"},
      {status:500}
    );
  }
}
