const Waitlist = () => {
	return (
		<div className="bg-background-image w-full h-screen bg-cover flex justify-center items-center">
			<div className="w-1/4 h-3/5 flex flex-col items-center justify-start space-y-5 ">
				<div className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-b from-[#2B2B2B] to-[#6E6E79]">
					<p>Join the waitlist for</p>
				</div>
				<div className="font-Agora font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-[#FFAF87] via-[#F170E8] to-[#819FFF] pb-4 px-10">
					SCOUT
				</div>
				<div className="w-full flex flex-col items-center space-y-4">
					<div className="relative opacity-70 w-3/5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="#6E6E79"
							className="w-7 h-7 absolute mr-2 left-5 top-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<input
							className="py-2 rounded-lg bg-transparent border-[#6E6E79] border-2 text-white text-center w-full"
							placeholder="Full Name"
						></input>
					</div>
					<div className="relative opacity-70 w-3/5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="#6E6E79"
							className="w-7 h-7 absolute mr-2 left-5 top-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
							/>
						</svg>

						<input
							className="py-2 rounded-lg bg-transparent border-[#6E6E79] border-2 text-white text-center w-full"
							placeholder="Email"
						></input>
					</div>
					<button className="bg-[#686C6E] py-2 w-3/5 rounded-xl hover:bg-white hover:text-black text-white opacity-60">
						Continue
					</button>
				</div>
			</div>
		</div>
	);
};

export default Waitlist;
